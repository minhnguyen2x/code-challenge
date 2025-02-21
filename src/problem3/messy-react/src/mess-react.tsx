interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // added to support priority extraction
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Step 1: Pre-compute priority for each balance.
  // This avoids duplicate calls to getPriority in both filtering and sorting.
  // add type string to blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  // Step 2: Using useMemo to pre-compute filtered and sorted balances.
  // Removed `prices` from dependency array since it’s not used in processing.
  const processedBalances = useMemo(() => {
    return balances
      .map((balance: WalletBalance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .filter((balance) => balance.priority > -99 && balance.amount > 0) // Adjusted filter: only positive balances.
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);

  // Step 3: Combine formatting within the mapping used for rendering rows.
  // This ensures that we use the formatted value created at the moment of rendering.
  const rows = processedBalances.map((balance, index) => {
    const formatted = balance.amount.toFixed();
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index} // For production, replace index with a unique identifier if available.
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

/*
Issues & Explanations
1)  Incorrect Variable Name in Filter:
Issue: The filter callback uses a variable lhsPriority which is not defined. It appears the intention was to use the computed balancePriority.
Improvement: Replace lhsPriority with balancePriority so that the filter evaluates correctly.

2)  Unnecessary Recalculation of Priority:
Issue: The getPriority function is called separately in the filter and then again in the sort method, leading to duplicate calculations.
Improvement: Pre-compute the priority for each balance once, then use this computed value for both filtering and sorting.

3)  Ambiguous Filter Logic:
Issue: The filter returns true only when balance.amount <= 0 provided balancePriority > -99, which appears counterintuitive since typically, one might want balances with a positive value.
Improvement: Clarify the filter logic. For instance, if the intention is to filter out balances with non-positive amounts, the condition should check balance.amount > 0.

4)  Redundant Dependency in useMemo:
Issue: The dependency array for the memoized sorted balances includes prices even though they are not used in filtering or sorting.
Improvement: Remove prices from the dependencies to ensure the memo is only re-computed when relevant data (balances) change.

5)  Inconsistent Mapping and Unused Formatted Array:
Issue: The code computes formattedBalances but then maps sortedBalances when producing rows. As a result, the computed formatted value is not used.
Improvement: Either merge the steps so the formatting is applied directly when creating rows or map over the correctly formatted list.

6)  Using Index as Key:
Issue: Relying on the index as a key in a list rendering can lead to issues when the list changes. Although not inherently wrong, it’s better to use a unique identifier.
Improvement: If possible, replace the index with a unique id from the balance data (if available). Otherwise, include a comment noting this as a potential improvement.
*/

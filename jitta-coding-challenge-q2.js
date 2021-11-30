/**
 * Find the best buy and sell date.
 * Method:
 * 1. Find the bearish reversals
 * 2. Find the min to the left of the reversals
 * 3. Profit = reversalPrice - minPrice
 *
 * O(n)
 *
 * @param prices
 */
function q2MaxProfit (prices) {

	if (prices.length < 2) {
		throw new Error('Cannot compare when the price data is less than 2 items.');
	}

	let lastSellIndex = -1;
	const transactions = [];

	for (let i = 1; i < prices.length; i++) {
		// Check if it is the last one or a reversal
		if (i === prices.length - 1 || (prices[i - 1].closePrice < prices[i].closePrice && prices[i].closePrice > prices[i + 1].closePrice)) {
			let maxPrice = prices[i].closePrice;
			let minPrice = prices[i].closePrice;
			let minIndex = i;
			for (let j = i; j > lastSellIndex; j--) {
				if (prices[j].closePrice < minPrice) {
					minPrice = prices[j].closePrice;
					minIndex = j;
				}
			}
			if (maxPrice - minPrice > 0) {
				transactions.push({
					buyIndex: minIndex,
					sellIndex: i,
					profit: maxPrice - minPrice,
				});
			}
			lastSellIndex = i;
		}
	}

	console.log("----- question 2 -----");

	let totalProfit = 0;
	for (const { buyIndex, sellIndex, profit } of transactions) {
		console.log(`buy: date: ${prices[buyIndex].date}, price: ${prices[buyIndex].closePrice}`);
		console.log(`sell: date: ${prices[sellIndex].date}, price: ${prices[sellIndex].closePrice}`);
		console.log(`profit: ${profit}`);
		totalProfit += profit;
	}
	console.log(`totalProfit: ${totalProfit}`);
}




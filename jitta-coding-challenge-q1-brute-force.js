/**
 * Find the best buy and sell date.
 * Method: bruteforce
 * O(n^2)
 *
 * @param prices
 */
function q1MaxProfitBruteForce (prices) {

	if (prices.length < 2) {
		throw new Error('Cannot compare when the price data is less than 2 items.');
	}

	let maxProfit = Number.NEGATIVE_INFINITY;
	let buyIndex = 0;
	let sellIndex = 1;

	for (let i = 0; i < prices.length; i++) {
		const buyPrice = prices[i].closePrice;
		for (let j = i + 1; j < prices.length; j++) {
			if (prices[j].closePrice - buyPrice > maxProfit) {
				maxProfit = prices[j].closePrice - buyPrice;
				buyIndex = i;
				sellIndex = j;
			}
		}
	}

	console.log("----- question 1 BruteForce -----");
	console.log(`buy: date: ${prices[buyIndex].date}, price: ${prices[buyIndex].closePrice}`);
	console.log(`sell: date: ${prices[sellIndex].date}, price: ${prices[sellIndex].closePrice}`);
	console.log(`profit: ${prices[sellIndex].closePrice - prices[buyIndex].closePrice}`);
}



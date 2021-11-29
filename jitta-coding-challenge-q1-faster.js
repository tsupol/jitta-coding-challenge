/**
 * Find the best buy and sell date.
 * Method:
 * 1 - Find the max.
 * 2 - Find the min on the left.
 * 3 - Repeat 1,2 recursively on the data to the right.
 * 4 - Compare both side
 * O(n(log(n))
 *
 * @param prices
 * @param startIndex
 * @returns {{buyIndex: number, sellIndex: number, profit: number}|{buyIndex: (number|*), sellIndex: (number|*), profit: (number|*)}}
 */
function singleMaxProfitRecursive (prices, startIndex = 0) {

	if (prices.length < 2) {
		throw new Error('Cannot compare when the price data is less than 2 items.');
	}

	let maxPrice = prices[startIndex].closePrice;
	let maxIndex = startIndex;
	let minPrice = prices[startIndex].closePrice;
	let minIndex = startIndex;

	// Find the max
	// ----------------------------------------
	for (let i = startIndex; i < prices.length; i++) {
		if (prices[i].closePrice > maxPrice) {
			maxPrice = prices[i].closePrice;
			maxIndex = i;
		}
	}

	// Find the min to the left of the max
	// ----------------------------------------
	for (let i = maxIndex - 1; i >= startIndex; i--) {
		if (prices[i].closePrice < minPrice) {
			minPrice = prices[i].closePrice;
			minIndex = i;
		}
	}

	const profitLeft = maxPrice - minPrice;

	// Find max profit to the right
	// ----------------------------------------
	if (maxIndex < prices.length - 1) {
		const {
			profit: profitRight,
			buyIndex: buyIndexRight,
			sellIndex: sellIndexRight,
		} = singleMaxProfitRecursive(prices, maxIndex + 1);
		if (profitRight > profitLeft) {
			return {
				profit: profitRight,
				buyIndex: buyIndexRight,
				sellIndex: sellIndexRight,
			};
		}
	}

	return {
		profit: profitLeft,
		buyIndex: minIndex,
		sellIndex: maxIndex,
	};

}

function q1BestProfitRecursive (prices) {
	const {
		profit,
		buyIndex,
		sellIndex,
	} = singleMaxProfitRecursive(prices);
	console.log("----- question 1 Recursive -----");
	console.log(`buy: date: ${prices[buyIndex].date}, price: ${prices[buyIndex].closePrice}`);
	console.log(`sell: date: ${prices[sellIndex].date}, price: ${prices[sellIndex].closePrice}`);
	console.log(`profit: ${profit}`);
}




import { dates } from './utils/dates.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const tickersArr = [];

const generateReportBtn = document.querySelector('.generate-report-btn');
const loadingArea = document.querySelector('.loading-panel');
const apiMessage = document.getElementById('api-message');

document.getElementById('ticker-input-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const tickerInput = document.getElementById('ticker-input');

	if (tickerInput.value.length > 0) {
		generateReportBtn.disabled = false;
		const newTickerStr = tickerInput.value;

		tickersArr.push(newTickerStr.toUpperCase());
		tickerInput.value = '';
		renderTickers();
	} else {
		const label = document.getElementsByTagName('label')[0];

		label.style.color = 'red';
		label.textContent = 'You must fill in the stock symbol';
	}
});

function renderTickers() {
	const tickersDiv = document.querySelector('.ticker-choice-display');
	tickersDiv.innerHTML = '';
	tickersArr.forEach((ticker) => {
		const newTickerSpan = document.createElement('span');
		newTickerSpan.textContent = ticker;
		newTickerSpan.classList.add('ticker');
		tickersDiv.appendChild(newTickerSpan);
	});
}

generateReportBtn.addEventListener('click', fetchStockData);

async function fetchStockData() {
	document.querySelector('.action-panel').style.display = 'none';
	loadingArea.style.display = 'flex';

	try {
		const stockData = await Promise.all(tickersArr.map(async (ticker) => {
			const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`;
			const response = await fetch(url);
			const data = await response.text();
			const status = response.status;
			if (status === 200) {
				apiMessage.innerText = 'Creating report...';
				return data;
			} else {
				loadingArea.innerText = 'There was an error fetching stock data.';
			}
		}))
		fetchReport(stockData.join(''))
	} catch (err) {
		loadingArea.innerText = 'There was an error fetching stock data.';
		console.error('error: ', err);
	}
}

async function fetchReport(data) {
	try {
		const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
		const model = genAI.getGenerativeModel({
			model: "gemini-1.5-flash",
			generationConfig: {
				temperature: 2,
			},
			systemInstruction: "You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell. Do not add any text formatting to the output.",
		});
		const prompt = data;
		const result = await model.generateContent(prompt);
		const text = result.response.text();
		renderReport(text);
	} catch (err) {
		console.log('Error:'.err);
		loadingArea.innerText = 'Unable to access AI. Please refresh and try again.';
	}
}

function renderReport(output) {
	loadingArea.style.display = 'none';
	const outputArea = document.querySelector('.output-panel');
	const report = document.createElement('p');
	outputArea.appendChild(report);
	report.textContent = output;
	outputArea.style.display = 'flex';
}

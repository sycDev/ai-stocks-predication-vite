# AI Stocks Prediction with Vite

A web application that uses AI to summarize stock performance and provide recommendations to buy, hold, or sell.

It integrates Polygon.io for real-time stock data and the Gemini API for AI-driven reporting. It offers concise insights based on recent stock performance to help users make informed decisions.

> **Note:** This application is for informational purposes only and does not constitute financial advice.

## Features

- **Real-Time Data:** Fetches up-to-date stock information from [Polygon.io](https://polygon.io/)
- **AI-Powered Reports:** Generates summaries and recommendations using the [Gemini API](https://ai.google.dev/gemini-api)
- **Modern UI:** Built with HTML, CSS, and JavaScript using Vite for a fast development experience

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/ai-stocks-prediction-vite.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd ai-stocks-prediction-vite
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Set Up Environment Variables:**

    Create a `.env` file in the root directory to store your API keys:

    ```bash
    touch .env
    ```

    Add the following lines to the `.env` file, replacing `your_polygon_api_key_here` and `your_gemini_api_key_here` with your actual API keys:

    ```env
    VITE_POLYGON_API_KEY=your_polygon_api_key_here
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```

    Ensure `.env` is included in `.gitignore` to keep it secure:

    ```plaintext
    # .gitignore
    .env
    ```

5. **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open your browser and follow the instructions to view the application.

## Usage

**Input stock symbols** to generate and view performance summaries and recommendations.

## API Documentation

- **Polygon.io Stocks API:** [Polygon.io Stocks API Docs](https://polygon.io/docs/stocks/getting-started)
- **Gemini API:** [Gemini API Docs](https://ai.google.dev/gemini-api/docs)

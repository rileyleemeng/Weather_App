import moment from "moment";
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const apiKey = '5fdf06cad2f63f4e25a10f2d89e8f112';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs', { weatherdata: null, cityName: null});
});

app.post('/weather', async (req, res) => {
    try {
        const cityName = req.body.city; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        const currentDate = moment().format('YYYY-MM-DD'); 
        res.render('weather.ejs', { weatherdata: response.data, cityName: cityName, currentDate: currentDate});
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
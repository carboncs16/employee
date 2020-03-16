require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/EmployeeRoutes');
const userRoutes = require('./routes/UserRoutes');
const requestLogger = require('./config/RequestLogger');
const errorLogger = require('./config/ErrorLogger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(requestLogger);
app.use('/api/employee', employeeRoutes);
app.use('/api/user', userRoutes);
app.use(errorLogger);

app.listen(process.env.PORT, () => console.log('Server running'));

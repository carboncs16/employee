var amqp = require('amqplib/callback_api');
const addToQueue = (obj) => {
    amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:5672`, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'task_queue';
            channel.assertQueue(queue, { durable: true });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(obj)), { persistent: true, contentType: 'application/json' });

            console.log(" [x] Sent %s", obj);
        });
        setTimeout(function () {
            connection.close();
        }, 500);
    });
};

module.exports = addToQueue;

import App from './src/app';

const app = App();

app.httpServer.listen(3000);
console.log('Application started on 3000 port');

app.httpServer.on('close', () => {
    console.log('Application has been stopped');
})
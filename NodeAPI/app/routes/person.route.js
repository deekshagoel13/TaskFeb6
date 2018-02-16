var controller=require('../controller/person.controller');
module.exports=(app)=>{

    app.post('/p',controller.create);
    app.get('/person',controller.fetch);
    app.delete('/person/:pid',controller.delete);
    app.put('/person/:pid',controller.update);
    app.get('/person/:pid',controller.fetchById);
    app.get('/state',controller.fetchState);
    app.get('/city/:sid',controller.fetchCity);
    app.post('/sort',controller.sortdata);
    app.post('/search',controller.search);
    app.post('/deleteall',controller.deleteMultiple);
}
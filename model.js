const Sequelize = require('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

sequelize.define('quiz', {
    question: {
        type: Sequelize.STRING,
        unique: {msg: "Ya existe esta pregunta"},
        validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}
    },
    answer:{
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vacía"}}
    }
});

sequelize.sync()
//Sincronizar: Mira en la bases de datos si hay contenido y si no lo crea.
.then(() => sequelize.models.quiz.count())
.then (count => {
    if(!count) {
        return sequelize.models.quiz.bulkCreate([
            { question: "Río más largo del mundo", answer: "Nilo"},
            { question: "Ave usada como mensajera", answer: "Paloma"},
            { question: "Bosque más grande del mundo", answer: "Amazonas"},
            { question: "Capital de Australia", answer: "Canberra"},
            { question:"Maravilla del mundo moderno situada en Jordania", answer:"Petra"}
        ]);
    }
})
.catch(error => {
    console.log(error);
});

module.exports = sequelize;
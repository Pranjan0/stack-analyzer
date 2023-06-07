const { masterAPI } = require("../config");
const Model = require("../models/operationModel");

const addOpData = (data) => {
    return new Promise((resolve, reject) => {
        fetch(masterAPI + "/op/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((result) => {
            console.log("Data Saved");
            resolve(result);
        })
        .catch((err) => {
            console.error("Error saving data", err);
            reject(err);
        });
    });
};

const readOpData = () => {
    return new Promise((resolve, reject) => {
        Model.find()
        .then((result) => {
            console.log("Data Retrieved");
            resolve(result);
        })
        .catch((err) => {
            console.error("Error retrieving data", err);
            reject(err);
        });
    });
}

module.exports =  { addOpData, readOpData}; 
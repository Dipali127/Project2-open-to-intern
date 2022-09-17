const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const Validator = require("../validation/validator");


//============================      create college       ==================   /functionup/colleges   ===============

const CreateCollege = async function (req, res) {
    try {

        let { name, fullName, logoLink} = req.body;

        if (!Validator.checkInputsPresent(req.body)) return res.status(400).send({ status: false, Error: "please provide details" });

        if (Validator.checkInputsPresent(rest)) return res.status(400).send({ status: false, Error: "please provide required details only => name, fullName, logoLink" });

        if (!Validator.checkString(name)) return res.status(400).send({ status: false, msg: "name is required ( in string )" });
        if (!Validator.validateName(name)) return res.status(400).send({ status: false, msg: "name is invalid, (required : in lowerCase)  " });

        if (!Validator.checkString(fullName)) return res.status(400).send({ status: false, msg: "fullName is required ( in string )" });
        if (!Validator.validatefullName(fullName)) return res.status(400).send({ status: false, msg: "fullName is invalid" });

        if (!Validator.checkString(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is required ( in string )" });
        if (!Validator.validatelogoLink(logoLink)) return res.status(400).send({ status: false, msg: "logoLink is invalid" });

        const findcollegeName = await collegeModel.findOne({ name: name.toLowerCase() });
        if (findcollegeName) return res.status(404).send({ status: false, msg: "college already exist" });

        const findcollegeFullName = await collegeModel.findOne({ name: fullName.toLowerCase() });
        if (findcollegeFullName) return res.status(404).send({ status: false, msg: "college already exist" });

        const result = await collegeModel.create(req.body);

        res.status(201).send({ status: true, data: result });
    } catch (err) {
        res.status(500).status({ status: false, Error: err.message });
    }
};

//============================      get college Details       ==================   /functionup/collegeDetails   ===============
const getCollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        if (!collegeName) return res.status(400).send({ status: false, msg: "Provide only collegeName in query" });

        let getCollegeDetails = await collegeModel.findOne({ name: collegeName.toLowerCase(), isDeleted: false });
        if (!getCollegeDetails) return res.status(404).send({ status: false, msg: "college data not exist or deleted already" });

        let internsDetails = await internModel.find({ collegeId: getCollegeDetails._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });
        if (internsDetails.length == 0) (internsDetails.push({ status: false, msg: "no interns found for the given coollege or deleted already" }))
        // return res.status(404).send({ status: false, msg: "no interns found for the given coollege or deleted already" });


        let result = {
            name: getCollegeDetails['name'],
            fullName: getCollegeDetails['fullName'],
            logoLink: getCollegeDetails['logoLink'],
            interns: internsDetails
        };
        res.status(200).send({ status: true, data: result });

    } catch (err) {
        res.status(500).status({ status: false, Error: err.message });
    }
}



module.exports = { CreateCollege, getCollegeDetails };

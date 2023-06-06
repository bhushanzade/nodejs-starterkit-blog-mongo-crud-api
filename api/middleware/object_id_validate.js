const mongoose = require('mongoose');
module.exports = (id_names) => {
    return (req, res, next) => {
        if (!Array.isArray(id_names)) return res.status(400).json({ message: 'Something went wrong in object id validation' });
        let invalid = null;
        for (let i = 0; i < id_names.length; i++) {
            const id = req.params[id_names[i]];
            if(!mongoose.Types.ObjectId.isValid(id)){
                invalid = id_names[i];
                break;
            }
        }
        if(invalid) return res.status(406).json({message : 'Something went wrong. Invalid object id found.'});
        return next();
    }
}
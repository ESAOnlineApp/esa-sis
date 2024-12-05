const {connect , disconnect} = require('../../../utilities/db')

const {createElective } = require('../controller/queries');

const { default: assignExistElective } = require('./exist/ExistElective');



async function handler (req , res){
    try {
        const connection = await connect();
        const {
            course_id,
            student_id,
            major_id,
            promotion
        } = req.body;
       

        // Check if assignments already exist for any student
        for (let i = 0; i < student_id.length; i++) {
            const exist = await assignExistElective(connection, course_id, student_id[i]);
            if (exist) {
                await disconnect(connection);
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: `Assignment already exists for student ${student_id[i]}!`
                });
            }
        }

        // Create assignments for all students
        const assignments = [];
        for (let i = 0; i < student_id.length; i++) {
            const response = await createElective(connection, course_id, student_id[i], major_id, promotion[0]);
            if (response.length === 0) {
                await disconnect(connection);
                return res.status(404).json({
                    code: 404,
                    success: false,
                    message: `Assignment not found for student ${student_id[i]}!`
                });
            }
            assignments.push(response.rows[0]);
        }

        // Send response after creating all assignments
        await disconnect(connection);
        return res.status(201).json({
            success: true,
            code: 201,
            message: 'Assignments created successfully',
            data: assignments
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        });
    }
}
export default handler;

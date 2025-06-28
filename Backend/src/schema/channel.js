import mongoose
 from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Channel name is required'],
        // unique: [true, 'Channel name already exists'],
        // match: [
        //     // eslint-disable-next-line no-useless-escape
        //     /^[a-zA-Z0-9]+$/,
        //     'Channel name should only contain letters and numbers'
        // ]
    },
//     description: {
//         type: String,
//         required: [true, 'Channel description is required'],
//         match: [
//             // eslint-disable-next-line no-useless-escape
//             /^[a-zA-Z0-9]+$/,
//             'Channel description should only contain letters and numbers'
//         ]
//     },
//     creator: {
//         type: String,
//         required: [true, 'Channel creator is required'],
//         match: [
//             // eslint-disable-next-line no-useless-escape
//             /^[a-zA-Z0-9]+$/,
//             'Channel creator should only contain letters and numbers'
//         ]
//     }
});


const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
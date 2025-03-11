import WorkInfo from '../Models/WorkInfo.model.js'
import User from '../Models/User.model.js'
import Bramhan from '../Models/Bramahn.model.js'
import nodemailer from 'nodemailer'
export const addWorkInfo = async (req, res) => {
        const { workname, date, stime, ftime, place, money, phone, maplink, noOfBrahman, note } = req.body
        try {
                const todaydate = new Date();
                const onlyDate = todaydate.toISOString().split('T')[0];
                if ((date > onlyDate || date == onlyDate) && ftime > stime && Number(money) && phone.length == 10 && Number(noOfBrahman)) {
                        const newWork = await new WorkInfo({
                                workname,
                                date: new Date(date),
                                stime,
                                ftime,
                                place,
                                money,
                                phone,
                                maplink,
                                noOfBrahman,
                                noOfBramhanrequired: Number(noOfBrahman),
                                noOfBramhanweave: 0,
                                note,
                                createdByuser: req.user !== null ? req.user._id : null,
                                createdBybramhin: req.bramhan !== null ? req.bramhan._id : null

                        })
                        await newWork.save()
                        //if user is null then it is bramhan
                        if (req.user === null) {
                                const bramhan = await Bramhan.findByIdAndUpdate(
                                        req.bramhan._id,
                                        { $push: { workscreate: newWork._id } },
                                        { new: true, useFindAndModify: false }
                                )
                        }
                        //if bramhan is null then it is user
                        else {
                                const user = await User.findByIdAndUpdate(
                                        req.user._id,
                                        { $push: { workInfos: newWork._id } },
                                        { new: true, useFindAndModify: false }
                                )
                        }
                        return res.status(201).json({ message: "Your work posted" })
                }
                else {
                        res.status(400).json({ error: "Something wrong in information" })
                }
        } catch (error) {
                console.log("error in addwork controller" + error);
                res.status(500).json({ error: "Internal server error" })
        }
}

export const home = async (req, res) => {
        try {
                const now = new Date();
                const todayDate = new Date(now.toISOString().split('T')[0]); // Ensure it's a Date object
                const currentTime = now.getHours(); // Convert to total minutes
                // console.log(currentTime)

                // Query: Get all pending work for the future or today after the current time
                const allData = await WorkInfo.find({
                        status: "Pending",
                        $or: [
                                { date: { $gt: todayDate } },  // Future dates
                                {
                                        date: { $eq: todayDate },
                                        stime: { $gt: currentTime } // Today's date with time after current time
                                }
                        ]
                });

                // console.log(allData);
                res.status(200).json(allData);
        } catch (error) {
                console.error("Error in home controller:", error);
                res.status(500).json({ error: "Internal server error" });
        }
};


export const completeWork = async (req, res) => {
        const { workId } = req.body
        // console.log(workId)
        try {
                const date = new Date();
                const onlyDate = date.toISOString().split('T')[0];
                const work = await WorkInfo.findOne({ _id: workId })

                // console.log(work.date.toISOString().split('T')[0],onlyDate)
                if (work.status === "Completed") {
                        return res.status(400).json({ error: "Work already completed" })
                }
                if (work.date.toISOString().split('T')[0] > onlyDate) {
                        return res.status(400).json({ error: "Work not completed yet" })
                }

                const allBramans = work.bramhan
                //find all bramsn email 
                const emails = await Promise.all(
                        allBramans.map(async (bramhanId) => {
                                const bramhan = await Bramhan.findOne({ _id: bramhanId })
                                return bramhan.email
                        }));
                // console.log(emails)

                //send email to all bramhan
                // ------------>
                const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS
                        }
                });

                const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: Array.isArray(emails) ? emails.join(",") : emails, // Convert array to comma-separated string
                        subject: "कार्य पूर्ण झाल्याबाबत सूचना",
                        html: `
                        <p>सन्माननीय गुरुजी,</p>
                        <p>आपणांस कळविताना आनंद होत आहे की <strong>${work.workname}</strong> हे कार्य दिनांक <strong>${work.date.toISOString().split('T')[0]}</strong> रोजी यशस्वीरित्या पूर्ण झाले आहे.</p>
                        <p>आपल्या सहकार्याबद्दल आम्ही आपले मनःपूर्वक आभार मानतो. आपण दिलेले वेळ आणि सेवा आम्हाला अत्यंत महत्त्वाची आहेत.</p>
                        <p>पुढील कार्यांसाठी देखील असेच सहकार्य अपेक्षित आहे.</p>
                        <p>धन्यवाद!</p>
                        <p>सादर,</p>
                        <p>आपले नाव / संस्था</p>
                    `               };

                transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                                console.error(error);
                        } else {
                                console.log("Email sent: " + info.response);

                        }
                });

                await WorkInfo.findByIdAndUpdate(workId,
                        { status: "Completed" },
                        { new: true, useFindAndModify: false })
                return res.status(201).json({ message: "Work completed" })

        } catch (error) {
                console.log("error in completeWork controller:", error);
                res.status(500).json({ error: "Internal server error" })

        }
}
export const cancelWork = async (req, res) => {
        const { workId } = req.body
        try {
                const date = new Date();
                const onlyDate = date.toISOString().split('T')[0];
                const work = await WorkInfo.findOne({ _id: workId })
                // console.log(work)
                if (work.status === "Completed") {
                        return res.status(400).json({ error: "Work already completed" })
                }
                if (work.date.toISOString().split('T')[0] < onlyDate) {
                        return res.status(400).json({ error: "Work already started" })
                }
                const allBramans = work.bramhan
                //find all bramsn email 
                const emails = await Promise.all(
                        allBramans.map(async (bramhanId) => {
                                const bramhan = await Bramhan.findOne({ _id: bramhanId })
                                return bramhan.email
                        }));
                // console.log(emails)

                //send email to all bramhan
                // ------------>
                const transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS
                        }
                });

                const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: Array.isArray(emails) ? emails.join(",") : emails, // Convert array to comma-separated string
                        subject: "कार्य रद्द करण्याबाबत सूचना",
                        html: `
                        <p>सन्माननीय गुरुजी,</p>
                        <p>आपणांस कळविण्यात येते की <strong>${work.workname}</strong> हे कार्य, जे <strong>${work.date.toISOString().split('T')[0]}</strong> रोजी नियोजित होते, काही वैयक्तिक कारणांमुळे रद्द करण्यात आले आहे.</p>
                        <p>यामुळे आपणास झालेल्या गैरसोयीबद्दल आम्ही दिलगिरी व्यक्त करतो. आपण दिलेल्या वेळेची व सहकार्याची आम्ही मनःपूर्वक कदर करतो.</p>
                        <p>समजून घेतल्याबद्दल धन्यवाद.</p>
                        <p>सादर,</p>
                        <p>आपले नाव / संस्था</p>
                    `                };

                transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                                console.error(error);
                        } else {
                                console.log("Email sent: " + info.response);

                        }
                });



                // console.log(work)
                await WorkInfo.findByIdAndUpdate(workId,
                        { status: "Canceled" },
                        { new: true, useFindAndModify: false }
                )
                return res.status(201).json({ message: "Work cancelled" })
        } catch (error) {
                console.log("error in cancelWork controller:", error);
                res.status(500).json({ error: "Internal server error" })

        }

}

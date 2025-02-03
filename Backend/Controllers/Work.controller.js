import WorkInfo from '../Models/WorkInfo.model.js'
export const addWorkInfo=async(req,res)=>{
        const {workname,date,stime,ftime,place,money,phone,maplink,noOfBraman,note}=req.body
        try {
                console.log(workname,date,stime,ftime,place,money,phone,maplink,noOfBraman,note)
                const todaydate = new Date();
                const onlyDate = todaydate.toISOString().split('T')[0];
                // 
                if((date>onlyDate || date==onlyDate)&& ftime>stime && Number(money) && phone.length == 10 && Number(noOfBraman))
                {
                        const newWork=await new WorkInfo({
                                workname,
                                date:new Date(date),
                                stime,
                                ftime,
                                place,
                                money,
                                phone,
                                maplink,
                                noOfBraman,
                                noOfBramanrequired:Number(noOfBraman),
                                noOfBramanweave:0,
                                note
                        })
                        await newWork.save()
                        return res.status(201).json({message:"Your work posted"})
                }
                else{
                        res.status(400).json({error:"Something wrong in information"})
                }
        } catch (error) {
                console.log("error in addwork controller" + error);
                res.status(500).json({ error: "Internal server error" })
        }
}

export const home=async(req,res)=>{
        try {
                const allData= await WorkInfo.find()
                // console.log(allData)
                res.status(201).json(allData)
        } catch (error) {
                console.log("error in home controller" + error);
                res.status(500).json({ error: "Internal server error" })
        }
}
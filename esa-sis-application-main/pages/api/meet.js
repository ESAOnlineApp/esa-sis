import axios from "axios";


const token = "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjRiYjhlZGM5LTY5MWEtNDQxYy1iY2ExLTk1YmQ4ZGQ1Y2VhNiJ9.eyJ2ZXIiOjksImF1aWQiOiI1MWM4ZmQ3MWZjZjMwYmYxYjFkMzJlZThjMGIyMzFhZiIsImNvZGUiOiJBeDF1UndlZEZWcGVPaGhQcFlDVHJTQ194N0s0akFBbWciLCJpc3MiOiJ6bTpjaWQ6amNxVmthY1VUTmFkZXJJaUFGazBJdyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJfOEpfbWRwTVNtdUZfYWN1aWYwS3ZRIiwibmJmIjoxNzA1NDA2OTQyLCJleHAiOjE3MDU0MTA1NDIsImlhdCI6MTcwNTQwNjk0MiwiYWlkIjoicWh4YlJpUFBRU0czRXdIVlNDT2pXQSJ9.hGIky-upCijGSnDsaJnZmQRqKCC9V1LA9XOuMikWptqZIRY-fNbBiB7uZ1qSW0yOXpj7ARwR4LlaSi_EP_4rQw";

async function getMeetings(){
    try{
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        const data = response.data;
        return data;
    }catch(error){
        console.error('Error in meet.js in api in function getMeetings : ',error);
    }
}

async function createMeeting(topic, start_time,type,duration,timezone,agenda){
    try{
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings',{
            topic,
            type,
            start_time,
            duration,
            timezone,
            agenda,
            settings:{
                host_video:true,
                participant_video:true,
                join_before_host:false,
                mute_upon_entry:true,
                watermark:false,
                use_pmi:false,
                approval_type:0,
                audio:'both',
                auto_recording:'none'
            }
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            },

        });
        const body = response.data;
        return body;
    }catch(error){
        console.error('Error in meet.js in api : ',error);
        return;
    }
}

(async()=>{
    console.log(await getMeetings());
    console.log(await createMeeting('CodingWithAdo new meeting','2023-11-20T10:00:00',2,45,'UTC','Team meeting for future videos'));
    console.log(await getMeetings());
})()
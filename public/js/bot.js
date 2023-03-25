var baseurl="https://api.openai.com/v1/chat/completions";

sendpostreq();
    async function sendpostreq(){
        try{
            const res=await fetch(baseurl,{
                mode: 'no-cors',
                method:'GET',
                headers:{
                    "Content-Type":'application/json',
                    "Authorization": 'Bearer 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'
                },
                data:JSON.stringify({
                    model: "davinci:ft-personal-2023-03-25-03-01-43",
                    messages: [{"role": "user", "content": "hello!!"}],
                    temperature: 0.7
                })
                
            });
            console.log(res);
        }
        catch(e){
            console.log(e);
        }
        
    }
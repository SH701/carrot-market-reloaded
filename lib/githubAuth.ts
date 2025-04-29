interface Mail{
    email:string,
    primary:boolean,
    verified:boolean,
}

export async function accessTokenGithub (code:string){
    const accessTokenParams =new URLSearchParams({
        client_id:process.env.GITHUB_CLIENT_ID!,
        client_secret:process.env.GITHUB_CLIENT_SECRET!,
        code:code,
    }).toString()
    const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
    const accessTokenResponse = await fetch(accessTokenURL,{
        method:"POST",
        headers:{
            Accept: "application/json",
        }
    })
    return await accessTokenResponse.json()
}
export async function getUserProfileGithub(access_token:string){
    const userProfileResponse = await fetch("https://api.github.com/user",{
        headers:{
            "Authorization": `Bearer ${access_token}`
        },
        cache:"no-cache"
    });
    return await userProfileResponse.json();
    
}
export async function getUserEmailGithub(access_token:string):Promise<Mail>{
    const userEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
        cache:"no-cache"
      });
      if (!userEmailResponse.ok) {
        throw new Error('Failed to fetch user Email');
      }
    const useremails = await userEmailResponse.json();
    const primaryEmailObj = useremails.find(
        (email:Mail) => email.primary === true && email.verified === true
      );
    return primaryEmailObj
}
import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { url } from 'inspector';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles



  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />
      <Window title={" آب و هوا "} style={{
        minHeight: 600, margin: 20, width: "calc(98% - 20px)",
        backgroundColor: "lch(0 0 0 / 0.92)", fontSize: "12pt", fontFamily:"shabnam"  }}>

          
        <div style={{width: "65%"}}>
          <div style={{
            width: "calc(150% - 50px)", height: 500, backgroundColor: "lab(70.71 31.26 69.29 / 0.4)", marginTop: "25pt",
            borderRadius: 5, marginLeft:"27pt",  color: "lightgray" ,
            backgroundSize:"cover",
            backgroundImage: `url(${"https://64.media.tumblr.com/ea58e7db40a5d7bdb9ba79c3bde69e7d/tumblr_pcoy6v4lwe1wnomtvo2_1280.jpg"})`}}>
              
            <br/><br/><br-x/>
            <div style= {{ width:"70%" , backgroundColor: "lab(2.27 5.88 -7.27 / 0.55)" , height:"300pt" , borderRadius: 10 , marginLeft:"94pt" }}>
              <div>
                  <br/>

                <div style={{fontFamily:"initial" , fontSize:"60pt" , textAlign:"center"}}> Shiraz </div>
                  <br/><br/>


                <div style={{textAlign:"center", fontSize:"20pt" , fontFamily:"serif"}}> <img src='https://cdn-icons-png.freepik.com/512/7340/7340001.png' style={{width:"2.5rem"}}>
                 </img>{(props.weather.hourly[2].tempC).toLocaleString("en-US")}C<sup>°  </sup> &nbsp; &nbsp;&nbsp;&nbsp;
                   <img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/humidity-drops-rain-water-weather-forecast-61169.png'
                 style={{width:"3rem"}}></img>{(props.weather.hourly[2].humidity).toLocaleString("en-US")}% &nbsp;&nbsp;&nbsp;&nbsp;
                  <img src='https://cdn-icons-png.flaticon.com/512/3741/3741046.png' style={{width:"2.5rem"}}> 
                 </img> {(props.weather.hourly[2].windspeedKmph).toLocaleString("en-US")}KM<sup>h </sup> &nbsp;&nbsp;&nbsp;&nbsp;
                 <img src='https://cdn.pixabay.com/photo/2023/03/29/04/20/eye-7884585_960_720.png'
                 style={{width:"3rem"}}></img>{(props.weather.hourly[2].visibility).toLocaleString("en-US")}KM </div>
                 <br/><br/>


                <div style={{ textAlign:"left" ,padding:"10px" , fontFamily:"monospace" , fontSize:"10pt"}}> 
                  <img src='https://cdn-icons-png.flaticon.com/256/7780/7780233.png' style={{width:"3rem"}}></img> {(props.weather.astronomy[0].sunrise).toLocaleString("en-US")}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Currently {(props.weather.hourly[2].weatherDesc[0].value).toLocaleString("en-US")} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src='https://cdn-icons-png.flaticon.com/512/3226/3226463.png' style={{width:"2rem"}}></img> {(props.weather.astronomy[0].sunset).toLocaleString("en-US")} </div>
                 <div style={{ textAlign: "left" , fontSize: "10pt", marginLeft:"20px" , paddingTop:"50px", fontFamily:"monospace" }}>
                 Last Update {(props.current_condition.observation_time).toLocaleString("en-US")} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; By Turing Group</div>
              </div>
            </div>
          </div>
        </div>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://cdn.ituring.ir/research/api/weather/")
  let data = await res.json()
  let current_condition = data.current_condition[0]
  let weather = data.weather[0]
  let nearest_area = data.nearest_area[0]
  let sunrise = data.weather[0].astronomy[0].sunrise
  let sunset = data.weather[0].astronomy[0].sunset

 



  return {
    props: {
      data: global.QSON.stringify({
        
        current_condition ,
        weather ,
        nearest_area ,
        session,
        // nlangs,
      })
    },
  }
}
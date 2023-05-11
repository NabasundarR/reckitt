import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEnvelope, FaPlug,FaAws } from "react-icons/fa";
import { useRef } from "react";
import Nonotifications from "../../assets/img/aip_n.svg";

const Notifications = () => {
  const [getNotifiactions, setNotifiactions] = useState([]);
  const [error, setError] = useState(null);
  const ref = useRef(null);

 /* const baseUrl =
    "https://api.json-generator.com/templates/oOrSYi5TlfY9/data?access_token=65doiwne5qp4u0li99sg306v4iw8klifu9ciiqph";

  useEffect(() => {
    const fetchSearchByname = async () => {
      await fetch(`${baseUrl}`)
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              setNotifiactions(json);
              setError(null);
              //console.log(isPageLoading);
            });
          }
        })
        .catch((err) => {
          setError(err.message);
          setNotifiactions(null);
          console.log(error);
        });
    };
    fetchSearchByname();
  }, [baseUrl]);*/

  const noti_items_data = [
    
    ]

   // console.log(noti_items_data.length)

  function idData() {
    var list = document.getElementsByClassName("noti_itmes_div");
    for (var i = 0; i < list.length; i++) {
      list[i].setAttribute("id", "notifications_" + i);
    }
  }
  idData();

  const removeData = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(
        "https://api.json-generator.com/templates/oOrSYi5TlfY9/data?access_token=65doiwne5qp4u0li99sg306v4iw8klifu9ciiqph" +
          id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
          },
        }
      )
        .then(console.log("Deleted"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={{height:"100%"}}>
      <div style={{height:"100%"}}  className="notifications_items">
       
        {noti_items_data.length !==0 &&(
         <>
         
         {noti_items_data.map((messageData, id) => {
          return (
            <div id="notifications_" className="noti_itmes_div" key={id}>
              <div className="noti_items">
                <div id="noti_iconid" className="noti_icons">
                  {messageData.typeOfmessage === "noti" ? (
                    <FaPlug fontSize={20}/>
                  ) : messageData.typeOfmessage === "meassage" ? (
                    <FaEnvelope fontSize={20}/>
                  ) : (
                    <FaAws fontSize={20}/>
                  )}
                </div>
                <div className="noti_text">
                  <span className="senderTitle">{messageData.title}</span>
                  <span className="notificationMessage">
                    {messageData.message}
                  </span>
                  <span className="lastupdateOn">
                    Last Updated: {messageData.lastUpdate}
                  </span>
                </div>
                <div
                  ref={ref}
                  className="delete_icon"
                  onClick={() => removeData(messageData.id)}
                >
                  <FaTrashAlt fontSize={20} cursor="pointer" color="#333" />
                </div>
              </div>
            </div>
          );
        })}
         
         </>
        )}

        {noti_items_data.length === 0 && (
          <div style={{height:"100%",display:"grid",alignItems:"center",justifyContent:"center",alignContent:"center",gridGap:"40px",background:'white'}}>

              <div>
                <img alt="no notifications" src={Nonotifications} width={200} />
              </div>

              <div style={{color:"#0000a0",fontSize:"20px",fontWeight:"600"}}>No Notifications available</div>

          </div>
        )}
       
      </div>
    </div>
  );
};

export default Notifications;

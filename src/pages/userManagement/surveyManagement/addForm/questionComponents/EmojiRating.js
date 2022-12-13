import React, { useState } from "react";
import emoji1 from "../../../../../assets/images/emoji/emoji1.png";
import emoji2 from "../../../../../assets/images/emoji/emoji2.png";
import emoji3 from "../../../../../assets/images/emoji/emoji3.png";
import emoji4 from "../../../../../assets/images/emoji/emoji4.png";
import emoji5 from "../../../../../assets/images/emoji/emoji5.png";
import '../../../../../styles/surveyManagement/surveyStyles.scss';

const EmojiRating= () => {
  const [style, setStyle]=useState()

  return (
    <>
      <div>
        <img
          src={emoji1}
          alt="emoji1"
          
          className={ style=="emoji1"? 'emoji2' :'emoji'}
          onClick={()=> setStyle("emoji1") }
        />
        <img
          src={emoji2}
          alt="emoji2"
          className={ style=="emoji2"? 'emoji2' :'emoji'}
          onClick={()=> setStyle("emoji2") }
        />
        <img
          src={emoji3}
          alt="emoji3"
          className={ style=="emoji3"? 'emoji2' :'emoji'}
          onClick={()=> setStyle("emoji3") }
        />
        <img
          src={emoji4}
          alt="emoji4"
          className={ style=="emoji4"? 'emoji2' :'emoji'}
          onClick={()=> setStyle("emoji4") }
        />
        <img
          src={emoji5}
          alt="emoji5"
          className={ style=="emoji5"? 'emoji2' :'emoji'}
          onClick={()=> setStyle("emoji5") }
        />{" "}
      </div>
    </>
  );
};
export default EmojiRating;
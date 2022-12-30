import Card from "../../Components/Card"
import './Index.scss'
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";


const websites = [
    {
      "postion":"left",
      "hexa": "#1D1148",
      "title": "test",
      "stack": ["react", "express", "node"],
      "description": "test",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613408078/codesandbox/swile_x8mcnc.png"
    },
    {
      "postion":"right",
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    },
    {
      "postion":"left",
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    },
    { "postion":"right",
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    },
    {
      "postion":"left",
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    }
]

export default function Projects(){
    return(
        <Container>
        <Swiper
        cssMode={true}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {websites.map((website, index) => (
          <SwiperSlide>
            <Card
              key={website.description}
              hexa={website.hexa}
              title={website.title}
              description={website.description}
              image={website.image}
              stack={website.stack}
              position={website.postion}
            />
            </SwiperSlide>
          ))}
          </Swiper>
          </Container>
        
    );
}

const Container = styled.div`
  width:98vw;
  display: flex;
  flex-direction: column;
  padding-bottom:400px ;
  /* min-height: 400vh; */
  
  /* margin-top:-130px ; */
`
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;;
  padding-left: calc(10vw - 160px);
  height: fit-content ;
  
  /* Fake padding-right */
  &::after {
    content: '';
    position: relative;
    display: block;
    flex-shrink: 0;
    width: calc(50vw - 160px);
    height: 1px;
  }

  > button {
    margin-right: 40px;
  }

  /* Hide the others cards */
  > button:not(:first-child) {
    visibility: visible; /* switch to 'visible' */
  }
`;
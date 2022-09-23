import Card from "../../Components/Card"
import './Index.scss'
import styled from "styled-components";

const websites = [
    {
      "hexa": "#1D1148",
      "title": "test",
      "stack": ["react", "express", "node"],
      "description": "test",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613408078/codesandbox/swile_x8mcnc.png"
    },
    {
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    },
    {
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    },
    {
      "hexa": "#FFCD00",
      "title": "Typeform",
      "stack": ["react", "express", "node"],
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    },
    {
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
        <Grid>
        {websites.map((website, index) => (
            <Card
              key={website.description}
              hexa={website.hexa}
              title={website.title}
              description={website.description}
              image={website.image}
              stack={website.stack}
            />
          ))}
          </Grid>
        </Container>
    );
}

const Container = styled.div`
  width:100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* mobile viewport bug fix */
  overflow-x: auto;
  scroll-behavior: smooth;

`
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;;
  padding-left: calc(10vw - 160px);
  height: 200vh ;
  
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
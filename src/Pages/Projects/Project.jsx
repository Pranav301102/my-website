import Card from "../../Components/Card"



const websites = [
    {
      "hexa": "#1D1148",
      "title": "Swile",
      "description": "https://www.swile.co/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613408078/codesandbox/swile_x8mcnc.png"
    },
    {
      "hexa": "#FFCD00",
      "title": "Typeform",
      "description": "https://www.welcometothejungle.com/fr/",
      "image": "https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png"
    }
]

export default function Projects(){
    return(
        <div>
        {websites.map((website, index) => (
            <Card
              key={website.description}
              hexa={website.hexa}
              title={website.title}
              description={website.description}
              image={website.image}
            />
          ))}
        </div>
    );
}
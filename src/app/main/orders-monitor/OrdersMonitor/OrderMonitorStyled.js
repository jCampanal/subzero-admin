import styled,{css} from "styled-components";
const WidthDriverBar='300px'

export const OrdersCardsS=styled.div`
position:fixed;
display:flex;
left:0;
flex-direction: column;
padding: 0px 2.5rem;
height:calc(100% - 359.95px);
width:${(props) => (props.Activate ? `calc(100% - ${WidthDriverBar})`: "100%")};
transition:all 500ms;
overflow-y:auto;
top:359.95px; 
@media screen and (min-width:960px){
    top:132.05px;
    padding: 0px 3.5rem;    
    height:calc(100% - 132.05px);    
}`;

export const DriversCardsS=styled.div`
position:fixed;
display:flex;
overflow:hidden;
flex-direction: column;
align-items:center;
right:${(props) => (!props.Activate ? '-'+WidthDriverBar: '0px')};
width:${WidthDriverBar};
background-color:#343a40;
height:calc(100% - 359.95px);
top:359.95px;  
transition: all 500ms;
@media screen and (min-width:960px){ 
    top:132.05px;  
    height:calc(100% - 132.05px);
    
}
`;


export const HeaderCardsS=styled.div`
position:fixed;
top:0;
left:0;
z-index:300;
display:grid;
background-color:#343a40;
color:#ffffff;
width:100%;
padding: 3rem 6rem;
justify-content: space-between;
align-items: center;
padding: 3rem 6rem;
grid-template-columns: repeat(1, minmax(0, 1fr));
@media screen and (min-width:960px){    
    grid-template-columns: repeat(5, minmax(0, 1fr));
}
    
`;

export const DivBodyS=styled.div`
width:100%;
display:flex;
flex-direction:row;`;

//<div className="bg-black text-gray-50 z-30 w-full py-12 px-24 grid grid-cols-1 md:grid-cols-5 items-center justify-between align-center fixed md:gap-7"></div>
import React from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`
    footer {
        background-color:#DAB692;
        color:#8F5B34;
        text-decoration:none;
        font-size:1.6rem;
        padding:3rem;

        a, :active, :visited, :hover{
        color:#8F5B34;
        }

        nav{
            width:30%;
            display:flex;
            flex-direction:row;
            margin:auto;
        }
        a{
            margin:0 15%
        }
}
    

`
const Footer=()=>{
    return (
        <StyledDiv>
        <footer>
            <nav>
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
                <a href="#" class="fa fa-instagram"></a>
            </nav>
        </footer>
        </StyledDiv>
        )
}

export default Footer;
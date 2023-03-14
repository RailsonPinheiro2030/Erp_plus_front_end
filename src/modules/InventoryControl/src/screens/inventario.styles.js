import styled from "styled-components";

export const Container = styled.div`
    width: 93.5rem;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center
`;

export const SubContainer = styled(Container)`
    background-color: #e6e5e3;
    border: 1px solid #e6e5e3;
    flex-direction: row;
    height: 20%;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 5px
    

`;

export const TextContainer = styled(Container)`
    background-color: white;
    align-items: center;
    justify-content: center;
    margin: -2px;
    flex-direction:column;
    height: 20px;
    width: 150px

`;



export const Cards = styled.div`
    width: 50%;
    height: 90px;
    background-color: white;
    margin: 30px;
    border-radius: 5px;
    padding: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start
    
`

export const TableContainer = styled.div`
    height: 60vh;
    width: 100%;
    border-radius: 10px;
    background-color: red
    
`
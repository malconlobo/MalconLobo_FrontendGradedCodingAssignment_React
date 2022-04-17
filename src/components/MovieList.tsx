import IDataList from "../models/IDataList";
import { getDataFromServer, addToFavourites, removeFromFavourites } from "../service/ApiCalls";
import { useState, useEffect } from "react";
import { ToastContainer, Toast, Row, Col, Container } from "react-bootstrap";
import MovieItem from "./MovieItem";
import { idText } from "typescript";
import ToastItem from "./ToastItem";

type Props = {
    match: any
}

type ToastObject = {
    toastString : string,
    toastBgType : string
}

const MovieList = (props: Props) => {
    const [items, setItems] = useState<IDataList[]>([]);
    const [toast, setToast] = useState<ToastObject[]>([]);

    let section = props.match.params.section;

    useEffect(
        () => {
            const getData = async () => {
                const data = await getDataFromServer(section);
                setItems(data);
                console.log(data);
            }
            getData();
        },
        [section]
    );

    const handleFavourites = async (movie : IDataList) => {
        try {
            if(section === "favourite"){
                const data = await removeFromFavourites(movie.id);
                const itemsAfterDelete = items.filter(data => data.id !== movie.id);
                setToast([...toast, {toastString : `${movie.title} removed from Favourites`, toastBgType : "success"}]);
                setItems(itemsAfterDelete);
            }
            else {
                const favouriteMovies = await getDataFromServer("favourite");
                const movieAlreadyPresent = favouriteMovies.filter(data => data.title === movie.title);
                if(movieAlreadyPresent.length === 0){
                    const {id, ...movieWithoutId} = movie;
                    const data = await addToFavourites(movieWithoutId);
                    setToast([...toast, {toastString : `${movie.title} added to Favourites`, toastBgType : "info"}]);
                    console.log("Movie Added");
                }
                else {
                    setToast([...toast, {toastString : `${movie.title} already present in Favourites`, toastBgType : "warning"}]);
                    console.log("Movie Already present");
                }
            }
        }
        catch(e : any){
            console.log(e.message);
        }
    }

    const favouriteText = section === "favourite" ? "Remove from favourites" : "Add to favourites"; 

    return (
        <>
            {

            }

            <Container>
            <ToastContainer className="p-3"  style={{zIndex : 1,position: "fixed",right: "20px",top: "20px"}}>
                {
                    toast.map((toast,idx) => <ToastItem key={idx} toastString={toast.toastString} toastBgType={toast.toastBgType}/>)                           
                }
            </ToastContainer>
            <Row lg={4}>
                {
                    items.map((movie, idx) => {
                        return (
                            <Col key={idx} className="d-flex align-items-stretch my-3">
                                <MovieItem movie={movie} handleFavourites={handleFavourites} favouriteText={favouriteText}/>
                            </Col>
                        )
                    }
                    )

                }
            </Row>
            </Container>



        </>
    )

}

export default MovieList;
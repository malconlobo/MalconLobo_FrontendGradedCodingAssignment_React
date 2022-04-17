import IDataList from "../models/IDataList";
import { Card, Button } from "react-bootstrap";
import { addToFavourites } from "../service/ApiCalls";

type Props = {
    movie: IDataList,
    handleFavourites: (movie: IDataList) => {},
    favouriteText: string
}

const MovieItem = ({ movie, handleFavourites, favouriteText }: Props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/img/${movie.poster}`} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="primary" onClick={() => { handleFavourites(movie) }}>{favouriteText}</Button>
            </Card.Body>
        </Card>
    )
}

export default MovieItem;
import Carousel from 'react-bootstrap/Carousel';
import firstSlide from '../assets/Slider.jpg';
import secondSlide from '../assets/Slider2.jpg'

function Carousell() {
    return (
        <Carousel data-bs-theme="dark" interval={20000}>
            <Carousel.Item>
                <img
                    className="d-block lg:w-full md:w-96 sm:w-52 w-100"
                    src={firstSlide}
                    alt="First slide"
                />
             
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block lg:w-full md:w-96 sm:w-52 w-100"
                    src={secondSlide}
                    alt="Second slide"
                />
           
            </Carousel.Item>
        </Carousel>
    );
}

export default Carousell;
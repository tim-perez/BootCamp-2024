import {LocationType} from "mongoose/locations/schema";
import styles from "./index.module.css";

interface PropsInterface {
    location: LocationType;
}

const LocationDetail = (props: PropsInterface): JSX.Element => {
    let location = props.location;
    return (
        <div>
            {location && (
                <ul className={styles.root}>
                    <li>
                        <b>Address: </b>
                        {location.address?.toString()}
                    </li>
                    <li>
                        <b>Zipcode: </b>
                        {location.zipcode?.toString()}
                    </li>
                    <li>
                        <b>Borough: </b>
                        {location.borough?.toString() ?? ""}
                    </li>
                    <li>
                        <b>Cuisine: </b>
                        {location.cuisine?.toString() ?? ""}
                    </li>
                    <li>
                        <b>Grade: </b>
                        {location.grade?.toString() ?? ""}
                    </li>
                </ul>
            )}
        </div>
    );
};
export default LocationDetail;
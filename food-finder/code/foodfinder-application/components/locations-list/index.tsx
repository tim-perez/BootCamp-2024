import LocationsListItem from "components/locations-list-item";
import styles from "./index.module.css";
import {LocationType} from "mongoose/locations/schema";
import { Key } from "react";

interface PropsInterface {
    locations: LocationType[];
}

const LocationsList = (props: PropsInterface): JSX.Element => {
    return (
        <ul className={styles.root}>
            {props.locations.map((location) => {
                return (
                    <LocationsListItem
                        location={location}
                        key={location.location_id as Key}
                    />
                );
            })}
        </ul>
    );
};

export default LocationsList;
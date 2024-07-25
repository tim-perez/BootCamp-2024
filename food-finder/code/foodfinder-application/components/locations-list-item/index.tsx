import Link from "next/link";
import styles from "./index.module.css";
import {LocationType} from "mongoose/locations/schema";

interface PropsInterface {
    location: LocationType;
}

const LocationsListItem = (props: PropsInterface): JSX.Element => {
    const location = props.location;
    return (
        <>
            {location && (
                <li className={styles.root}>
                    <Link href={`/location/${location.location_id}`}>
                        <h2>
                            {location.name as React.ReactNode}
                            <small className={styles.details}>
                                {location.cuisine as string} in {location.borough as string}
                            </small>
                        </h2>
                    </Link>
                </li>
            )}
        </>
    );
};

export default LocationsListItem;
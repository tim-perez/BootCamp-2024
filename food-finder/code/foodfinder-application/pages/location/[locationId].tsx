import Head from "next/head";
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData, NextPage } from "next";
import LocationDetail from "components/location-details";
import dbConnect from "middleware/db-connect";
import { findLocationsById } from "mongoose/locations/services";
import { LocationType } from "mongoose/locations/schema";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";

const Location: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data }) => {
    const location: LocationType = JSON.parse(data?.location || "{}");
    const title = `The Food Finder - Details for ${location?.name || "Location"}`;

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`The Food Finder. Details for ${location?.name || "Location"}`} />
            </Head>
            <h1>{location?.name as ReactNode || "Unknown Location"}</h1>
            <LocationDetail location={location} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    let locations: LocationType[] = [];
    const { locationId } = context.query;

    try {
        await dbConnect();
        locations = await findLocationsById([locationId as string]);
        if (locations.length === 0) {
            throw new Error(`Location ${locationId} not found`);
        }
    } catch (err) {
        return { notFound: true };
    }

    return {
        props: { data: { location: JSON.stringify(locations[0]) } },
    };
};

export default Location;
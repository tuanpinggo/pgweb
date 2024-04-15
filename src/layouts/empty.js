import Head from "next/head";

export default function EmptyLayout({children}){
    return(
        <>
            <Head>
                <title>Pinggo Retailer</title>
            </Head>
            {children}
        </>
    )
}
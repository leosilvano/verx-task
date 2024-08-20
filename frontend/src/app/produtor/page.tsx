"use client";

import React from "react";
import {ProdutorList} from "@/lib/components/ProdutorList";

type Props = {
    params: { movie_id: number }
}

export default function MoviePage({params}: Props) {

    return (
        <div className="d-flex flex-column container" style={{"margin": "70px auto 50px auto"}}>
            <ProdutorList/>
        </div>
    );
}
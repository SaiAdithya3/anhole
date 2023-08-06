import connectMongoDB from "../../../lib/mongodb";
import Upload from "../../../models/upload";
import {NextResponse} from "next/server";

export async function GET(request, {params}){
    const id = params;
    await connectMongoDB();
    const files = await Upload.find({uid: id});
    return NextResponse.json({files});
}
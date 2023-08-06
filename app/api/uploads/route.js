import connectMongoDB from "../../../lib/mongodb";
import Upload from "../../../models/upload";
import {NextResponse} from "next/server";

export async function POST(request) {
    const {name, size, type} = await request.json();

    await connectMongoDB();
    await Upload.create({name, size, type});
    return NextResponse.json({message: "File Uploaded"},{status: 201})
}

export async function GET(){
    await connectMongoDB();
    const files = await Upload.find();
    return NextResponse.json({files});
}
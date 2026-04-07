import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // const [rows] = await pool.query("SELECT DATABASE() AS db");
    const [rows] = await pool.query("SELECT * FROM employees");

    return NextResponse.json({
      success: true,
      rows,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Ket noi MySQL that bai",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { AirportInfo } from "@/queries/useAirportQuery";
import { getApiResponse } from "@/utils/api";

export async function GET() {
  const res = await fetch(
    "https://api.odcloud.kr/api/3051587/v1/uddi:007305db-cbc2-4554-8988-f9109b2dad10?page=1&perPage=5018&serviceKey=I20Mgb7g16QWreM4ZGxkuwxfN%2BJfAWguHqSWPXv1reNU2XqXgDbdHfW%2FAJ3Ayzf%2BytGbUrJupAPpUF0eU8LMRQ%3D%3D"
  );

  if (res.ok) {
    const result = (await res.json()) as AirportInfo;
    result.data = result.data.filter((d) => !!d["공항코드1(IATA)"]);

    return getApiResponse("OK", result);
  }

  return getApiResponse(
    "ERROR",
    new Response(null, {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  );
}

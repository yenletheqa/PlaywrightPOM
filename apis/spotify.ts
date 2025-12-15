import { APIRequestContext } from "@playwright/test";

export interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope?: string;
}

export interface SpotifyGetArtistResponse {
    external_urls?: {
        spotify: string;
    };
    followers?: {
        href: string | null;
        total: number;
    };
    genres?: string[];
    href?: string;
    id: string;
    images?: {
        height: number;
        url: string;
        width: number;
    }[];
    name: string;
    popularity?: number;
    type?: 'artist';
    uri?: string;
}

const GET_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const GET_ARTIST_URL = 'https://api.spotify.com/v1/artists/'

export async function getSpotifyAccessToken(
    request: APIRequestContext
): Promise<string> {
    const envClientId = process.env.SPOTIFY_CLIENT_ID;
    const envClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!envClientId || !envClientSecret) {
        throw new Error('Missing Spotify client credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables or pass them as arguments.');
    }


    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', envClientId);
    body.set('client_secret', envClientSecret);

    const res = await request.post(GET_TOKEN_URL, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: body.toString(),
    });

    if (!res.ok) {
        throw new Error(
            `Spotify token request failed (${res.status}): ${await res.text()}`
        );
    }

    const json = await res.json() as SpotifyTokenResponse;

    console.log(`Response: ${JSON.stringify(json, null, 4)}`)

    return json.access_token;
}

export async function getSpotifyArtist(
    request: APIRequestContext,
    accessToken: string,
    artistId: string): Promise<SpotifyGetArtistResponse> {

    const res = await request.get(`${GET_ARTIST_URL}${artistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if (!res.ok) {
        throw new Error(`Spotify get artist failed (${res.status}): ${await res.text()}`)
    }
    const json = await res.json() as SpotifyGetArtistResponse;
    console.log(`Response: ${JSON.stringify(json, null, 4)}`)

    return json;
}
// import { auth } from '@/auth';
// import { NextResponse } from 'next/server';

// export default auth((req) => {
//   if (!req.auth) {
//     // Not logged in, redirect to home or login page
//     return NextResponse.redirect(new URL('/properties', req.url));
//   }
//   // Logged in, allow access
//   return NextResponse.next();
// });

// export const config = {
//   matcher: ['/properties/add', '/messages', '/profile', '/profile/:path*'],
//   runtime: 'nodejs',
// };
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  // console.log('middleware auth', req.auth.user);

  // User is NOT logged in
  if (!req.auth?.user) {
    //  /properties/add
    if (pathname === '/properties/add') {
      return NextResponse.redirect(new URL('/properties', req.nextUrl));
    }

    // All other protected routes
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Logged in → allow
});

export const config = {
  matcher: ['/properties/add', '/messages', '/profile', '/saved'],
};

// middleware auth Request {
//   method: 'POST',
//   url: 'http://localhost:3000/properties/add',
//   headers: Headers {
//     host: 'localhost:3000',
//     connection: 'keep-alive',
//     'content-length': '2',
//     'sec-ch-ua-platform': '"Windows"',
//     'next-action': '002c605a08febab2a9ab8c7d383ec66ae641041db7',
//     'x-nextjs-request-id': '3e497d21',
//     'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
//     'sec-ch-ua-mobile': '?0',
//     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
//     accept: 'text/x-component',
//     dnt: '1',
//     'content-type': 'text/plain;charset=UTF-8',
//     'x-nextjs-html-request-id': 'SGAeyuoBVCFEUpPhome2v',
//     origin: 'http://localhost:3000',
//     'sec-fetch-site': 'same-origin',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-dest': 'empty',
//     referer: 'http://localhost:3000/properties/add',
//     'accept-encoding': 'gzip, deflate, br, zstd',
//     'accept-language': 'en-US,en;q=0.9',
//     cookie: 'authjs.csrf-token=f6483e9fbaac4acecf488b48276f2c678acec4b313260e11766e7f4897abe7c0%7Cdbae6e3c2fc0377816603e86d1d93435b95f576266da55d17282cdd7e0933836; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fproperties%2F69603ffa79d54b41bf47aa68; __next_hmr_refresh_hash__=622; authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiQUw4Vy0zUFNtN0U2VW5tMjV3cEZRRW5UeUo4bWFXdEdxbmZzOHpoUklIcjZkR2RsdERBdU1qRTBQblEwb2ZORzVJSFJxRDkzMDdpLVVIbTZETWFsVVEifQ..GVLrQ0f8zzL4VbLMN51GJA.GMVzfrbchEUAA5_oAOdw8s43eMAHi-H2swMIIlS9owEk3oBGXZYicGM7tZh-AHr_llOxVGZKrgZRAX0DEd0pTmHSmQsOQf36m_uIEmxgN0ecxL9ru4fNBLMsjm-DEC9cUYxB-ZcucQxBGwAODqYl5ur8HH4EiMtXTJhKJzTLyi_jk-VmUrVWyNNLJUeFO73O4NYIW18MJavWbTerGxVOVLLF45WdoyiugCJWGvLM-Kmqy5-p0u3YYe1cx3AnlKoj7hnd_ab3CQRkTRN-GnE4aLQhAi2HeOI3k0AaiZzCTQ4tkQUHFD_KCjwKPbTj10t-2hVvMIMkF8E05TXcI7-HfkDAJ1O8D7ExatdVOW-PC9YYP8vuL2HbXCGaL2ApYma-FFbX89YkjPKxFkawhds_wcLQByCHbzuWBhFdGl6_0to.ilspsnMdVKRGifn3wH6dWHOYwvHe1Y9YCHBRClB6x7c',
//     'x-forwarded-host': 'localhost:3000',
//     'x-forwarded-port': '3000',
//     'x-forwarded-proto': 'http',
//     'x-forwarded-for': '::1'
//   },
//   destination: '',
//   referrer: 'about:client',
//   referrerPolicy: '',
//   mode: 'cors',
//   credentials: 'same-origin',
//   cache: 'default',
//   redirect: 'follow',
//   integrity: '',
//   keepalive: false,
//   isReloadNavigation: false,
//   isHistoryNavigation: false,
//   signal: AbortSignal { aborted: false }
// }
// mongoDB is connected
//  POST /properties/add 200 in 150ms (compile: 8ms, proxy.ts: 71ms, render: 71ms)
// middleware auth Request {
//   method: 'POST',
//   url: 'http://localhost:3000/properties/add',
//   headers: Headers {
//     host: 'localhost:3000',
//     connection: 'keep-alive',
//     'content-length': '2',
//     'sec-ch-ua-platform': '"Windows"',
//     'next-action': '002c605a08febab2a9ab8c7d383ec66ae641041db7',
//     'x-nextjs-request-id': '28c69975',
//     'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
//     'sec-ch-ua-mobile': '?0',
//     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
//     accept: 'text/x-component',
//     dnt: '1',
//     'content-type': 'text/plain;charset=UTF-8',
//     'x-nextjs-html-request-id': 'SGAeyuoBVCFEUpPhome2v',
//     origin: 'http://localhost:3000',
//     'sec-fetch-site': 'same-origin',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-dest': 'empty',
//     referer: 'http://localhost:3000/properties/add',
//     'accept-encoding': 'gzip, deflate, br, zstd',
//     'accept-language': 'en-US,en;q=0.9',
//     cookie: 'authjs.csrf-token=f6483e9fbaac4acecf488b48276f2c678acec4b313260e11766e7f4897abe7c0%7Cdbae6e3c2fc0377816603e86d1d93435b95f576266da55d17282cdd7e0933836; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fproperties%2F69603ffa79d54b41bf47aa68; __next_hmr_refresh_hash__=622; authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiQUw4Vy0zUFNtN0U2VW5tMjV3cEZRRW5UeUo4bWFXdEdxbmZzOHpoUklIcjZkR2RsdERBdU1qRTBQblEwb2ZORzVJSFJxRDkzMDdpLVVIbTZETWFsVVEifQ..x1ZYc8PHw7HevRjnm7ZAMg.1y5U8hYZBgYrkJrV4N-WuRk-WGpM7g5jTlwsaU_lDKHILAwXcjHufGhVmcN-oxjgFenhSKdPi1Z-OKo4_RnLwWR3KfPS4lCGU34A13kUPqhcXyZsvlymJKMgJCJyKOkhc6UuO0FVYXMcyf2zal5euBX-SwJH72QUw-ORu8HygpSHXZk14DJv3b5IjfYbvgcDyJ0H0jQELllG8NhJidyCpb0ux7V7KVgOvZfmwcERvlx8Hyp0c2cZNcG5dAtEqpVesoqGP-tx-XGzhwGzP01C6syyFOkagyvqwdEpg1pXeIY_WMRPaQjqkmm9fNB2YDsd4VWi8n1WbTiLPZ3Iy1BwLZ5nVgmnSm7t3FYgT4-mnvUbmAyKneJgpu_cqZNV512TuV180kHQDk3pvQJ93AYns4WFnaCl8TwBcKJFMXw8HfU.0c0qLRtn3CAlYoiYk9LYDVxfxwTEpcC66izpqXC1sgw',
//     'x-forwarded-host': 'localhost:3000',
//     'x-forwarded-port': '3000',
//     'x-forwarded-proto': 'http',
//     'x-forwarded-for': '::1'
//   },
//   destination: '',
//   referrer: 'about:client',
//   referrerPolicy: '',
//   mode: 'cors',
//   credentials: 'same-origin',
//   cache: 'default',
//   redirect: 'follow',
//   integrity: '',
//   keepalive: false,
//   isReloadNavigation: false,
//   isHistoryNavigation: false,
//   signal: AbortSignal { aborted: false }
// }

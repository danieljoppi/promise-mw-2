/// <reference types="express" />
/// <reference path="../src/types.d.ts"/>

import express = require('express');
export import STATUS_CODES = require('./status-codes');
export declare class Error extends global.Error {
    extra: any;
    httpStatus: STATUS_CODES;
    message: string;
    constructor(message: string);
    constructor(httpStatus: STATUS_CODES, message: string);
    constructor(httpStatus: STATUS_CODES, extra: any, message: string);
}

type keyOfExpress = "header" | "end" | "status" | "sendStatus" | "links" | "send" | "json" | "jsonp"
    | "sendFile" | "sendfile" | "download" | "contentType" | "type" | "format" | "attachment" | "set"
    | "headersSent" | "get" | "clearCookie" | "cookie" | "location" | "redirect" | "render" | "locals"
    | "charset" | "vary" | "app" | "write" | "writeContinue" | "writeHead" | "statusCode" | "statusMessage"
    | "setHeader" | "setTimeout" | "sendDate" | "getHeader" | "removeHeader" | "addTrailers" | "finished"
    | "writable" | "addListener" | "emit" | "on" | "once" | "prependListener" | "prependOnceListener"
    | "removeListener" | "removeAllListeners" | "setMaxListeners" | "getMaxListeners" | "listeners"
    | "eventNames" | "listenerCount"

export declare const __construct: {
    Error: typeof Error;
    send(...args: any[]): {
        __call__: keyofExpress;
        status: STATUS_CODES;
        args: any[];
    };
    render(...args: any[]): PromiseMw2.Command;
    status(status: STATUS_CODES, call: keyOfExpress, ...args: any[]): {
        __call__: keyOfExpress;
        status: STATUS_CODES;
        args: any[];
    };
    other(call: keyOfExpress, ...args: any[]): PromiseMw2.Command;
    next(): PromiseMw2.Command;
};
export declare type HookFnResp = void;
export declare type HookFnT<T extends PromiseMw2.Command> = (cmd: T) => (res: express.Response, next: express.NextFunction) => Promise<HookFnResp>;
export declare type mwGenerateFnT = (req: express.Request, helper: typeof __construct) => Promise<PromiseMw2.Command>;
export declare const middlewareFrom: (handler: mwGenerateFnT) => express.RequestHandler;
export declare type methodsT = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' |
    'head' | 'checkout' | 'copy' | 'lock' | 'merge' | 'mkactivity' | 'mkcol' | 'move' | 'm-search'
    | 'notify' | 'purge' | 'report' | 'search' | 'subscribe' | 'trace' | 'unlock' | 'unsubscribe';
export declare type pmwMatcher = (path: string, ...handlers: mwGenerateFnT[]) => void;
export declare type pmwMatcher2 = (...handlers: mwGenerateFnT[]) => void;
export declare type wrapT = {
    [methods in methodsT]: pmwMatcher;
} & {
    use: pmwMatcher | pmwMatcher2;
} & {
    route: (param) => {
        [keys in methodsT]: pmwMatcher2;
    };
};
export declare function wrap(app: express.Application | express.Router): wrapT;

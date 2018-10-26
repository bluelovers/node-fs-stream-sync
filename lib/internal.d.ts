/// <reference types="node" />
import * as fs from "fs";
import { SyncReadStream } from '../read-sync';
import { SyncWriteStream } from '../write-sync';
import { IFsStreamData } from './interface';
export declare const SYM_FS_STREAM_DATA: unique symbol;
export declare type IThisFsStream = fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream;
export declare function open(thisArgv: IThisFsStream, argv?: any[]): void;
export declare function _error_emit<T extends Error>(thisArgv: IThisFsStream, e: T): void;
export declare function __close(thisArgv: IThisFsStream): void;
export declare function _error_callback<T extends Error>(thisArgv: IThisFsStream, e: T, callback: Function): void;
export declare function closeFsStreamSync(stream: fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream, cb: Function, err?: any): void;
export declare function _destroy(thisArgv: IThisFsStream, error: Error | null, callback: (error: Error | null) => void): void;
export declare function getFsStreamData(thisArgv: IThisFsStream): IFsStreamData;

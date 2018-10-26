import * as fs from "fs";
import { SyncReadStream } from '../read';
import { SyncWriteStream } from '../write';

type IThisFsStream = fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream

export function open(thisArgv: IThisFsStream, argv?: any[])
{
	let fd: number
	try
	{
		// @ts-ignore
		fd = fs.openSync(thisArgv.path, thisArgv.flags, thisArgv.mode)
	}
	catch (er)
	{
		_error_emit(thisArgv, er)
		return;
	}

	// @ts-ignore
	thisArgv.fd = fd;
	thisArgv.emit('open', fd);
	thisArgv.emit('ready');
}

export function _error_emit<T extends Error>(thisArgv: IThisFsStream, e: T): void
{
	__close(thisArgv)
	thisArgv.emit('error', e);
}

export function __close(thisArgv: IThisFsStream): void
{
	// @ts-ignore
	if (thisArgv.autoClose)
	{
		thisArgv.destroy();
	}
}

export function _error_callback<T extends Error>(thisArgv: IThisFsStream, e: T, callback: Function): void
{
	__close(thisArgv)
	callback(e);
}

export function closeFsStreamSync(stream: fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream,
	cb: Function,
	err?,
)
{
	let er
	try
	{
		// @ts-ignore
		fs.closeSync(stream.fd)
	}
	catch (e)
	{
		er = e || err;
	}

	cb(er)
	// @ts-ignore
	stream.closed = true;
	if (!er)
	{
		stream.emit('close');
	}
}

export function _destroy(thisArgv: IThisFsStream, error: Error | null, callback: (error: Error | null) => void): void
{
	// @ts-ignore
	const isOpen = typeof thisArgv.fd !== 'number';

	if (isOpen)
	{
		thisArgv.once('open', closeFsStreamSync.bind(null, thisArgv, callback, error));
		return;
	}

	closeFsStreamSync(thisArgv, callback)
	// @ts-ignore
	thisArgv.fd = null;
}


// @ts-ignore
Object.freeze(exports)
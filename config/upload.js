/*
|--------------------------------------------------------------------------
| 上传参数配置
|--------------------------------------------------------------------------
|
*/
module.exports = {

    /*
    |--------------------------------------------------------------------------
    | 上传路径
    |--------------------------------------------------------------------------
    |
    */
    path: env('UPLOAD_PATH') || './public/uploads',
}
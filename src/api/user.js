import request from "@/utils/request";

export function uploadImg(data) {
  return request({
    url: "/user/uploadImg",
    method: "post",
    data: data
  });
}

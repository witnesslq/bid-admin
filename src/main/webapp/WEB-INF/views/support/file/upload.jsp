<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>upload file</title>
</head>
<body>
<form action="/support/file/upload" enctype="multipart/form-data" method="post">
  <input type="file" name="file"/>
    <input type="text" name="name">
  <input type="submit" value="上传"/>
</form>
</body>
</html>
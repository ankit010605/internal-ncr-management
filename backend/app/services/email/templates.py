def ncr_created_template(ncr, image_urls):

    images_html = ""

    if image_urls:
        for i, url in enumerate(image_urls, start=1):
            images_html += f"""
            <div style="
                margin-bottom:30px;
                text-align:center;
                border:1px solid #dddddd;
                border-radius:10px;
                padding:15px;
                background:#fafafa;
            ">

                <h4 style="margin-top:0;color:#d97706;">
                    Attachment {i}
                </h4>

                <img
                    src="{url}"
                    style="
                        width:100%;
                        max-width:650px;
                        border-radius:10px;
                        border:2px solid #d1d5db;
                        box-shadow:0px 3px 8px rgba(0,0,0,.15);
                    "
                >

                <br><br>

                <a
                    href="{url}"
                    target="_blank"
                    style="
                        color:#2563eb;
                        text-decoration:none;
                        font-weight:bold;
                    "
                >
                    View Full Resolution
                </a>

            </div>
            """
    else:

        images_html = """
        <p style="color:#777;">
            No attachments were uploaded.
        </p>
        """

    return f"""
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

</head>

<body style="
margin:0;
padding:30px;
background:#f3f4f6;
font-family:Arial,Helvetica,sans-serif;
">

<div style="
max-width:850px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 5px 15px rgba(0,0,0,.12);
">

<!-- HEADER -->

<div style="
background:#d97706;
color:white;
padding:25px;
text-align:center;
">

<h2 style="margin:0;">
🟠 INTERNAL NCR RAISED
</h2>

<p style="
margin-top:10px;
font-size:15px;
">

A new Internal NCR has been raised and requires your attention.

</p>

</div>


<div style="padding:30px;">

<h3 style="margin-top:0;">
NCR Details
</h3>

<table
style="
width:100%;
border-collapse:collapse;
font-size:15px;
">

<tr style="background:#f9fafb;">
<td style="padding:12px;border:1px solid #ddd;"><b>NCR Number</b></td>
<td style="padding:12px;border:1px solid #ddd;">
<b style="color:#d97706;">{ncr.ncr_number}</b>
</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #ddd;"><b>Project</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.project_name}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:12px;border:1px solid #ddd;"><b>Drawing Number</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.drawing_number or "-"}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #ddd;"><b>Plant</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.plant}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:12px;border:1px solid #ddd;"><b>Bay</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.bay}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #ddd;"><b>Stage</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.stage}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:12px;border:1px solid #ddd;"><b>Issue Date</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.issue_date}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #ddd;"><b>Target Closing Date</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.target_closing_date}</td>
</tr>

<tr style="background:#f9fafb;">
<td style="padding:12px;border:1px solid #ddd;"><b>Raised By</b></td>
<td style="padding:12px;border:1px solid #ddd;">{ncr.initiator_name}</td>
</tr>

<tr>
<td style="padding:12px;border:1px solid #ddd;">
<b>NCR Closure Owner</b>
</td>

<td style="padding:12px;border:1px solid #ddd;">
<b>{ncr.responsible_person}</b>
</td>
</tr>

</table>


<h3 style="
margin-top:35px;
">
NCR Description
</h3>

<div style="
background:#fff7ed;
border-left:6px solid #d97706;
padding:18px;
border-radius:8px;
line-height:1.7;
">

{ncr.ncr_description}

</div>


<h3 style="
margin-top:35px;
">
Photo Evidence
</h3>

{images_html}

<hr style="margin-top:35px;">

<p style="
font-size:15px;
">

Please review this NCR and take the necessary corrective action before the target closing date.

</p>

</div>


<div style="
background:#f9fafb;
padding:20px;
text-align:center;
color:#666;
font-size:13px;
">

This is an automatically generated email from the
<b>Internal NCR Management System</b>.

<br><br>

Please do not reply to this email.

</div>

</div>

</body>

</html>
"""
def ncr_closed_template(ncr, image_urls):

    images_html = ""

    for i, url in enumerate(image_urls, start=1):

        images_html += f"""
        <div style="margin-bottom:20px;">
            <p style="font-weight:bold;">
                Attachment {i}
            </p>

            <img
                src="{url}"
                style="
                    max-width:600px;
                    width:100%;
                    border:1px solid #ccc;
                    border-radius:8px;
                "
            >

            <br>

            <a href="{url}" target="_blank">
                View Full Image
            </a>
        </div>
        """

    return f"""
<!DOCTYPE html>

<html>

<head>
<meta charset="UTF-8">
</head>

<body style="
font-family:Arial,Helvetica,sans-serif;
background:#f5f5f5;
padding:30px;
">

<div style="
background:white;
max-width:750px;
margin:auto;
padding:30px;
border-radius:10px;
">

<div style="
background:#16a34a;
padding:18px;
border-radius:8px;
color:white;
text-align:center;
">

<h2 style="margin:0;">
🟢 INTERNAL NCR CLOSED
</h2>

<p style="
margin-top:10px;
font-size:18px;
font-weight:bold;
">
NCR No: {ncr.ncr_number}
</p>

<p>
This Internal NCR has been successfully closed.
</p>

</div>

<hr>

<h3>Closure Summary</h3>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Status</b></td>
<td>🟢 CLOSED</td>
</tr>

<tr>
<td><b>Closed By</b></td>
<td>{ncr.closed_by or "-"}</td>
</tr>

<tr>
<td><b>Closed Date</b></td>
<td>{ncr.closed_date}</td>
</tr>

<tr>
<td><b>Target Closing Date</b></td>
<td>{ncr.target_closing_date}</td>
</tr>

</table>

<hr>

<h3>NCR Details</h3>

<table style="width:100%;border-collapse:collapse;">

<tr>
<td><b>Project</b></td>
<td>{ncr.project_name}</td>
</tr>

<tr>
<td><b>Drawing Number</b></td>
<td>{ncr.drawing_number or "-"}</td>
</tr>

<tr>
<td><b>Plant</b></td>
<td>{ncr.plant}</td>
</tr>

<tr>
<td><b>Bay</b></td>
<td>{ncr.bay}</td>
</tr>

<tr>
<td><b>Stage</b></td>
<td>{ncr.stage}</td>
</tr>

<tr>
<td><b>Issue Date</b></td>
<td>{ncr.issue_date}</td>
</tr>

<tr>
<td><b>Raised By</b></td>
<td>{ncr.initiator_name}</td>
</tr>

<tr>
<td><b>Responsible Person</b></td>
<td>{ncr.responsible_person}</td>
</tr>

</table>

<hr>

<h3>NCR Description</h3>

<p>
{ncr.ncr_description}
</p>

<hr>

<h3>Root Cause Analysis</h3>

<p>
{ncr.root_cause_analysis or "-"}
</p>

<hr>

<h3>Corrective & Preventive Action</h3>

<p>
{ncr.corrective_preventive_action or "-"}
</p>

<hr>

<h3>Photo Evidence</h3>

{images_html}

<hr>

<p>

This Internal NCR has been successfully closed.

</p>

<p style="color:gray;font-size:13px;">

This is an automatically generated email from the
<b>Internal NCR Management System</b>.

<br><br>

Please do not reply to this email.

</p>

</div>

</body>

</html>
"""
    